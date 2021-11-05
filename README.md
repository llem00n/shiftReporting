# Shift Handover documentation

## Contents

1. [Front-end part](#front-end)
	1. [Setting up the environment](setup-front)
	2. [Disabling authorization](disable-auth-front)
2. [Back-end part](#back-end)
	1. [Setting up the environment](setup-back)
		1. [Windows](setup-back-win)
		2. [Linux](setup-back-linux)
	2. [Disabling Authorization](disable-auth-back)

## Front-end part
<a name="front-end"></a>

Front-end part of both applications is written with [Angular CLI](https://angular.io) 12.1.3
Repos: [Shift Handover](https://github.com/llem00n/shiftReporting), [Data Entries App](https://github.com/llem00n/sh-dee)
Main dependencies: [ngrx](https://ngrx.io/), [Angular Material](https://material.angular.io/), [tailwindcss](https://tailwindcss.com/)

### Setting up the environment (both projects)
<a name="setup-front"></a>

To set up the environment you need to [clone](https://git-scm.com/docs/git-clone) the repo and run `npm i` command in the root folder of the project.  
To start the app you need to run `ng s` command in the root folder of the project.

### Disabling authorization
<a name ="disable-auth-front"></a>

⚠ **Make sure it's done in a separate branch and is not pushed to the team branch!**

To disable authorization for the front-end part of the app you need to follow these steps:
1. In the constructor of the AuthorizationService in [authorization.service.ts](https://github.com/llem00n/shiftReporting/blob/dev/src/app/modules/authorization/authorization.service.ts) uncomment line `// this.setCurrentuser()`
2. Swap the commented and uncommented declaration of the user property of the OidcClientService in [oicd-client.service.ts](https://github.com/llem00n/shiftReporting/blob/dev/src/app/modules/authorization/oidc-client.service.ts):
    ```javascript
    private user = this.FAKE_USER
    // private user = null;
    ```
3. Change the load method of the OicdClientService in [oicd-client.service.ts](https://github.com/llem00n/shiftReporting/blob/dev/src/app/modules/authorization/oidc-client.service.ts) to this:
    ```javascript
    load(): Promise<void> {
    const jsonFile = `assets/oidc-config.json`;
    return this.http.get(jsonFile)
      .toPromise()
      .then((res: UserManagerSettings) => {
        this.manager = new UserManager(res);
        return this.manager.getUser()
      })
      .then(user => {
        // console.log(this.manager.getUser());

        // FAKE_USER
        // this.user = user;
        this.user = this.FAKE_USER;
      })
      .catch(rej => console.log(rej));
    }
    ```
4. Update baseUrl in the [environment.ts](https://github.com/llem00n/shiftReporting/blob/dev/src/environments/environment.ts) with your back-end address

## Back-end part
<a name="back-end"></a>

Back-end part of both applications is written with [ASP.NET Core 3.1](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-3.1)
Repos: [Shift handover](https://github.com/JohnCgit/ShiftReporting-B), [Data Entries App](https://github.com/llem00n/sh-dee-back)

<details>
<summary>Packages (click to expand)</summary>

* [IdentityServer4](https://www.nuget.org/packages/IdentityServer4/3.1.2?_src=template)
* [IdentityServer4.AccessTokenValidation](https://www.nuget.org/packages/IdentityServer4.AccessTokenValidation/3.0.1?_src=template)
* [IdentityServer4.AspNetIdentity](https://www.nuget.org/packages/IdentityServer4.AspNetIdentity/3.1.2?_src=template)
* [Microsoft.AspNet.WebApi.Cors ](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Cors/5.2.7?_src=template)
* [Microsoft.AspNetCore.Authentication.JwtBearer](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.JwtBearer/3.1.2?_src=template)
* [Microsoft.AspNetCore.Mvc.NewtonsoftJson](https://www.nuget.org/packages/Microsoft.AspNetCore.Mvc.NewtonsoftJson/3.1.7?_src=template)
* [Microsoft.AspNetCore.Razor.Design](https://www.nuget.org/packages/Microsoft.AspNetCore.Razor.Design/2.2.0?_src=template)
* [Microsoft.AspNetCore.SpaServices](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices/3.1.3?_src=template)
* [Microsoft.AspNetCore.SpaServices.Extensions](https://www.nuget.org/packages/Microsoft.AspNetCore.SpaServices.Extensions/3.1.3?_src=template)
* [Microsoft.EntityFrameworkCore.SqlServer](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.SqlServer/3.1.7?_src=template)
* [Microsoft.EntityFrameworkCore.Tools](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Tools/3.1.7?_src=template)
* [Microsoft.VisualStudio.Web.CodeGeneration.Design](https://www.nuget.org/packages/Microsoft.VisualStudio.Web.CodeGeneration.Design/3.1.2?_src=template)
* [Newtonsoft.Json](https://www.nuget.org/packages/Newtonsoft.Json/12.0.3?_src=template)
* [System.Private.ServiceModel](https://www.nuget.org/packages/System.Private.ServiceModel/4.7.0?_src=template)
* [System.ServiceModel.Duplex](https://www.nuget.org/packages/System.ServiceModel.Duplex/4.4.4?_src=template)
* [System.ServiceModel.Http](https://www.nuget.org/packages/System.ServiceModel.Http/4.4.4?_src=template)
* [System.ServiceModel.NetTcp](https://www.nuget.org/packages/System.ServiceModel.NetTcp/4.4.4?_src=template)
* [System.ServiceModel.Security](https://www.nuget.org/packages/System.ServiceModel.Security/4.4.4?_src=template)
</details>

### Setting up the environment
<a name="setup-back"></a>

#### Windows
<a name="setup-back-win"></a>

To set up the environment you need to follow these steps (the guide doesn't include database setup):
1. Clone the repo and open the solution with Visual Studio;
2. The main project is called ShiftReporting, so, you can unload the rest projects;
3. Check, if you have all the dependencies;
4. Now you can build (Ctrl + B) and run (Ctrl + f5) the project.

#### Linux
<a name="setup-back-linux"></a>

To set up the environment you need to follow these steps (the guide doesn't include database setup):
1. Clone the repo and navigate to its root folder;
2. To run this project you will need to install .NET SDK 3.1 (search for it with your package manager);
3. To build the project you need to run `dotnet build ShiftReporting`;
4. To run the project you need to run `dotnet run --project ShiftReporting`;

### Disabling authorization
<a name="disable-auth-back"></a>

⚠ **Make sure it's done in a separate branch and is not pushed to the team branch!**.

To disable authorization you need to follow these steps:
1. Make GetDataSources request in [DataSourcesController](https://github.com/JohnCgit/ShiftReporting-B/blob/master/ShiftReporting/Controllers/DatasourcesController.cs) to look like this:
	```c#
	[HttpPost,  Route("api/[controller]/GetDatasources")]
	public  async  Task<IActionResult>  GetDatasources(GetDatasourcesRequest  request)
	{
		try
		{
			return  Ok(new  PIAFServiceReference.Datasource[0]);
		}
		catch  (Exception  ex)
		{
			ErrorMessage  error  =  new  ErrorMessage();
			error.Message = ex.Message.ToString();
			error.FullException = ex.ToString();
			return  StatusCode(500, error);
		}
	}
	```
2. Replace Startup class in [Startup.cs](https://github.com/JohnCgit/ShiftReporting-B/blob/master/ShiftReporting/Startup.cs) with this:
	```c#
	public  class  Startup
	{
		public  Startup(IConfiguration  configuration)
		{ 
			Configuration = configuration;
		}

		public  IConfiguration  Configuration  {  get;  }

		// This method gets called by the runtime. Use this method to add services to the container.
		public  void  ConfigureServices(IServiceCollection  services)
		{
			services.AddCors(options  => options.AddPolicy("AllowAll",  p  => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
			_ = services.AddControllers().AddNewtonsoftJson(x  =>  { x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;  });
			services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
			services.AddMvc().AddNewtonsoftJson();
			services.AddDbContext<ShiftReportingContext>();
			services.AddAuthentication("Bearer")
			.AddIdentityServerAuthentication("Bearer",  options  =>
			{
				options.Authority = Configuration["AppSettings:IdentityServerUri"];
				options.RequireHttpsMetadata =  false;
				options.ApiName =  "api1";
			});
			services.AddSpaStaticFiles(configuration  =>
			{
				configuration.RootPath =  "ClientApp/dist";
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public  void  Configure(IApplicationBuilder  app,  IWebHostEnvironment  env)
		{
			if  (env.IsDevelopment())
			{ app.UseDeveloperExceptionPage(); }
			app.UseDefaultFiles();
			app.UseStaticFiles();
			app.UseRouting();
			app.UseCors("AllowAll");
			app.UseHttpsRedirection();
			app.UseEndpoints(endpoints => endpoints.MapControllers());
		}
	}
	```
