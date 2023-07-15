import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { routerModel } from 'src/app/common/models/router.model';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit, AfterContentInit {

  public isOpenSideBar: boolean = true;
  public loading$: Observable<boolean>;

  public routerData: routerModel[] = [
    {"path": "dashboard",
"title": "Dashboard",
"iconType": "material-icons-two-tone",
"icon": "dashboard",
"class": "",
"groupTitle": false,
"badge": "",
"badgeClass": "",
"submenu":[]
 },
 {"path": "project",
"title": "Project",
"iconType": "material-icons-two-tone",
"icon": "assignment",
"class": "",
"groupTitle": false,
"badge": "",
"badgeClass": "",
"submenu":[]
 },
 {"path": "financial",
 "title": "Financial",
 "iconType": "material-icons-two-tone",
 "icon": "card_travel",
 "class": "",
 "groupTitle": false,
 "badge": "",
 "badgeClass": "",
 "submenu":[]
  },
  {"path": "report",
 "title": "Report",
 "iconType": "material-icons-two-tone",
 "icon": "assessment",
 "class": "",
 "groupTitle": false,
 "badge": "",
 "badgeClass": "",
 "submenu":[]
  },
  {"path": "labor",
  "title": "Labor",
  "iconType": "material-icons-two-tone",
  "icon": "settings_accessibility",
  "class": "menu-toggle",
  "groupTitle": false,
  "badge": "",
  "badgeClass": "",
  "submenu":[
    {"path": "labor/labor-rate",
  "title": "Labor Rate",
  "iconType": "material-icons-two-tone",
  "icon": "settings_accessibility",
  "class": "",
  "groupTitle": false,
  "badge": "",
  "badgeClass": "",
  "submenu":[
    
  ]
   },
   {"path": "labor/project-labor",
   "title": "Project Labor",
   "iconType": "material-icons-two-tone",
   "icon": "settings_accessibility",
   "class": "",
   "groupTitle": false,
   "badge": "",
   "badgeClass": "",
   "submenu":[
     
   ]
    },
  
  ]
   },
  //  {"path": "Material",
  //  "title": "",
  //  "iconType": "material-icons-two-tone",
  //  "icon": "assignment",
  //  "class": "",
  //  "groupTitle": false,
  //  "badge": "",
  //  "badgeClass": "",
  //  "submenu":[]
  //   },
//     {
//       label: "Dashboard",
//       route: "dashboard",
//       icon: "dashboard",
//     },
//     {
//       label: "Project",
//       route: "project",
//       icon: "assignment",
      
      
//     },
//     {
//       label: "Financial",
//       route: "financial",
//       icon: "card_travel",
//     },
//     {
//       label: "Report",
//       route: "report",
//       icon: "assessment",
//     },
//     {
//       label: "Labor",
//       route: "labor",
//       icon: "settings_accessibility",
//       children:[
//         {
//           label: "Labor Rate",
//           route: "labor/labor-rate",
//           icon: "settings_accessibility",
         
         
//         },
//         {
//           label: "Project Labor",
//           route: "labor/project-labor",
//           icon: "settings_accessibility",
          
         
//         },
//       ],
      
     
//     },
//     {
//       label: "Material",
//       route: "",
//       icon: "precision_manufacturing",
//     },
//     {
//       label: "Setting",
//       route: "setting",
//       icon: "settings",
//     },
//     {
//       label: "User",
//       route: "user",
//       icon: "people",
//     },
//     {
//       label: "Voucher",
//       route: "voucher",
//       icon: "local_offer",
//     }
  ]

  constructor(public loader: LoadingService) { }

  ngOnInit(): void {
    this.isOpenSideBar = false
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.loading$ = this.loader.loading$
    });

  }

  public onClickSideNavToggle() {
    this.isOpenSideBar = !this.isOpenSideBar;
  }

}
