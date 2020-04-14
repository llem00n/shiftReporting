import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, Input, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map, filter, tap, catchError } from 'rxjs/operators';
// import { PiafAttribute } from '@models/*';
// import { PiService } from '../../pi.service';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { PiafHttpService } from '../../piaf-http.service';
import { PiafAttribute } from '../../models';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public level: number,
    public expandable: boolean,
    public data: { name: string, path: string, type?: string },
    public isLoading = false,
  ) { }
}

@Injectable()
export class DynamicDataSource {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);
  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private pis: PiafHttpService,
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed
      .subscribe(change => {
        (change.added.length || change.removed.length)
          && this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);

      });
    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    change.added && change.added.forEach(node => this.toggleNode(node, true));
    change.removed && change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
  }
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    node.isLoading = true;
    let children;
    this.pis.getElementStructure(node.data.path)
      .pipe(
        catchError(e => {
          node.isLoading = false;
          return of('');
        })
      )
      .subscribe(
        value => {
          children = value;
          const index = this.data.indexOf(node);
          if (!children || index < 0) { // If no children, or cannot find the node, no op
            return;
          }          
          if (expand) {
            const nodesChild = children.childElements.map(name =>
              new DynamicFlatNode(name, node.level + 1, true, { name, path: `${node.data.path}%5C${name}` }));
            const nodesAttributes = children.attributes.map(item =>
              new DynamicFlatNode(item.name, node.level + 1, false,
                { name: item.name, path: `${node.data.path}|${item.name}`, type: item.type }));
            const nodes = nodesChild.concat(nodesAttributes);
            this.data.splice(index + 1, 0, ...nodes);
          } else {
            let count = 0;
            for (let i = index + 1; i < this.data.length
              && this.data[i].level > node.level; i++, count++) { }
            this.data.splice(index + 1, count);
          }
          this.dataChange.next(this.data);
          node.isLoading = false;
        }
      );
  }
}

@Component({
  selector: 'app-piaf-tree',
  templateUrl: './piaf-tree.component.html',
  styleUrls: ['./piaf-tree.component.scss'],
})
export class PiafTreeComponent implements OnChanges {
  @Input() serverName: string;
  @Input() databaseName: string;
  @Input() allowedTypes: string[];
  @Input() stepper: MatHorizontalStepper;
  @Output() selectAttribute: EventEmitter<PiafAttribute> = new EventEmitter<PiafAttribute>();


  selectedAttribute: PiafAttribute;

  constructor(
    private pis: PiafHttpService,
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, pis);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnChanges() {
    this.initialData();
  }

  initialData() {
    const {
      serverName,
      databaseName
    } = this;
    const parentPath = `%5C%5C${serverName}%5C${databaseName}%5C`;
    serverName && databaseName &&
      this.pis.getDatabaseElements({ serverName, databaseName })
        .pipe(
          filter((val: any) => !!val),
          tap(_ => this.stepper && setTimeout(() => { this.stepper.next(); }, 100)),
          map(elements => elements.map(name => new DynamicFlatNode(name, 0, true, { name, path: parentPath + name }))),
          tap(elements => this.dataSource.data = elements),
        ).subscribe();
  }

  nodeTypeIsAllowed(node: DynamicFlatNode): boolean {
    return this.allowedTypes.includes(node.data.type);
  }

  clickAttr(node: DynamicFlatNode): void {
    const {
      name,
      path,
      type
    } = node.data;
    const piafAttribute = { name, path, type };
    this.selectedAttribute = piafAttribute;
    this.selectAttribute.emit(piafAttribute);
  }
}
