import {NgModule} from "@angular/core";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {MessagesModule} from "primeng/messages";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {PanelModule} from "primeng/panel";
import {FieldsetModule} from "primeng/fieldset";
import {RadioButtonModule} from "primeng/radiobutton";
import {ButtonModule} from "primeng/button";
import {MessageModule} from "primeng/message";
import {SidebarModule} from "primeng/sidebar";
import {SplitButtonModule} from "primeng/splitbutton";
import {ProgressBarModule} from "primeng/progressbar";
import {DropdownModule} from "primeng/dropdown";
import {ConfirmationService} from "primeng/api";

@NgModule({
  exports: [
    ToastModule,
    MenuModule, TooltipModule, ProgressBarModule,
    DialogModule, CheckboxModule, InputTextModule, ToolbarModule,
    ButtonModule, SplitButtonModule, PanelModule, FieldsetModule, RadioButtonModule,
    TableModule,  MessageModule, MessagesModule, SidebarModule, DropdownModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class NgPrimeModule { }
