import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PiafTreeComponent, DynamicFlatNode, DynamicDataSource } from './piaf-tree.component';
// import { PiService } from '../../pi.service';
import { MatTreeModule, MatTreeNode, MatTreeNodeToggle, MatTreeNodePadding } from '@angular/material/tree';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
const getElStructureRes = {
  Name: 'Element',
  ChildElements: ['Element1'],
  Attributes: [
    { Name: 'Attribute_1', Type: 'System.Boolean' },
    { Name: 'Attribute_2', Type: 'System.String' },
  ]
};

describe('PiafTreeComponent', () => {
  let testFlatNodes;
  let component: PiafTreeComponent;
  let fixture: ComponentFixture<PiafTreeComponent>;
  // let pisSpy: jasmine.SpyObj<PiService>;

  beforeEach(async(() => {
    const spyPIS = jasmine.createSpyObj('PiService',
      ['getDatabaseElements', 'getElementStructure']);
    TestBed.configureTestingModule({
      imports: [MatTreeModule],
      declarations: [
        PiafTreeComponent,
      ],
      providers: [
        // { provide: PiService, useValue: spyPIS },
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiafTreeComponent);
    component = fixture.componentInstance;
    pisSpy = TestBed.get(PiService);
    pisSpy.getDatabaseElements.and.returnValue(of(['test0', 'test1']));
    testFlatNodes = <DynamicFlatNode[]>[
      {
        'item': 'test0', 'level': 0, 'expandable': true,
        'data': { 'name': 'test0', 'path': '%5C%5Ctest%5Ctest%5Ctest0' },
        'isLoading': false
      },
      {
        'item': 'test1', 'level': 0, 'expandable': true,
        'data': { 'name': 'test1', 'path': '%5C%5Ctest%5Ctest%5Ctest1' },
        'isLoading': false
      }
    ];
    component.ServerName = 'test';
    component.DatabaseName = 'test';
    component.allowedTypes = ['System.String'];
    component.stepper = <MatHorizontalStepper>{ next: () => { } };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#ngOnChanges()', () => {
    spyOn(component, 'initialData');
    component.ngOnChanges();
    expect(component.initialData).toHaveBeenCalled();
  });
  it('#initialData()', fakeAsync(() => {
    spyOn(component.stepper, 'next');
    component.initialData();
    tick(100);
    expect(pisSpy.getDatabaseElements).toHaveBeenCalledWith({
      ServerName: 'test',
      DatabaseName: 'test'
    });
    fixture.detectChanges();
    expect(component.stepper.next).toHaveBeenCalled();
    expect(JSON.parse(JSON.stringify(component.dataSource.data))).toEqual(testFlatNodes);
    const de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
    expect(de.length).toBe(2);
    de.map(i => expect(i.nativeElement.textContent).toMatch('chevron_right'));
    expect(de[0].nativeElement.textContent).toMatch('test0');
    expect(de[1].nativeElement.textContent).toMatch('test1');
  }));
  describe('click elements', () => {
    beforeEach(() => {
      pisSpy.getElementStructure.and.returnValue(of(getElStructureRes));
      component.dataSource.data = testFlatNodes;
      fixture.detectChanges();
    });
    it('getElementStructurr() return error', () => {
      pisSpy.getElementStructure.and.returnValue(throwError({ message: 'testError' }));
      const de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
      expect(de.length).toBe(2);
      de[0].nativeElement.dispatchEvent(new Event('click'));
    });
    it('click node', () => {
      let de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
      expect(de.length).toBe(2);
      de[0].nativeElement.dispatchEvent(new Event('click'));
      de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
      expect(de.length).toBe(5);
      de[0].nativeElement.dispatchEvent(new Event('click'));
      de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
      expect(de.length).toBe(2);
    });
    it('click allowed attribute', () => {
      const expectAttr = { name: 'Attribute_2', path: '%5C%5Ctest%5Ctest%5Ctest0|Attribute_2', type: 'System.String' };
      spyOn(component.selectAttribute, 'emit');
      let de = fixture.debugElement.queryAll(By.css('mat-tree-node'));
      de[0].nativeElement.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      const alowedNode = fixture.debugElement.queryAll(By.css('.allowed'));
      expect(alowedNode.length).toBe(2);
      de = fixture.debugElement.queryAll(By.css('.attribute'));
      de[0].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.selectAttribute.emit).not.toHaveBeenCalled();
      de[1].triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(component.selectAttribute.emit).toHaveBeenCalledWith(expectAttr);
    });
  });
  it('#nodeTypeIsAllowed(node: DynamicFlatNode): boolean', () => {
    component.allowedTypes = ['test0', 'test1', 'test2'];
    const nodeIn = <DynamicFlatNode>{ data: { type: 'test0' } };
    const nodeOut = <DynamicFlatNode>{ data: { type: 'test3' } };
    expect(component.nodeTypeIsAllowed(nodeIn)).toBe(true);
    expect(component.nodeTypeIsAllowed(nodeOut)).toBe(false);
  });
  it('#clickAttr(node: DynamicFlatNode): void', () => {
    spyOn(component.selectAttribute, 'emit');
    const expectedAttribute = {
      type: 'testType',
      name: 'testName',
      path: 'testPath'
    };
    const node = <DynamicFlatNode>{
      data: {
        type: 'testType',
        name: 'testName',
        path: 'testPath'
      }
    };
    component.clickAttr(node);
    expect(component.selectedAttribute).toEqual(expectedAttribute);
    expect(component.selectAttribute.emit).toHaveBeenCalledWith(expectedAttribute);
  });
  it('#getLevel(node: DynamicFlatNode)', () => {
    const node = <DynamicFlatNode>{ level: 1 };
    expect(component.getLevel(node)).toBe(1);
  });
  it('#isExpandable(node: DynamicFlatNode)', () => {
    const node = <DynamicFlatNode>{ expandable: true };
    expect(component.isExpandable(node)).toBe(true);
  });
  it('#hasChild(_: number, nodeData: DynamicFlatNode)', () => {
    const node = <DynamicFlatNode>{ expandable: true };
    expect(component.hasChild(1, node)).toBe(true);
  });
});
