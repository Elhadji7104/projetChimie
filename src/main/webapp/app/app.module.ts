import './vendor.ts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { ProjetChimieSharedModule } from 'app/shared';
import { ProjetChimieCoreModule } from 'app/core';
import { ProjetChimieAppRoutingModule } from './app-routing.module';
import { ProjetChimieHomeModule } from './home/home.module';
import { ProjetChimieAccountModule } from './account/account.module';
import { ProjetChimieEntityModule } from './entities/entity.module';
import * as moment from 'moment';
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule, DropdownModule, InputMaskModule, InputSwitchModule, SplitButtonModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { ProjetChimieFicheEmpruntProduitModule } from './entities/fiche-emprunt-produit/fiche-emprunt-produit.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { EmpruntRetourComponent } from './entities/emprunt-retour/emprunt-retour.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { RechercheComponent } from './recherche/recherche.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProcessusComponent } from './processus/processus.component';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { ProcessusDetailComponent } from './processus/processus-detail/processus-detail.component';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        TableModule,
        DataTableModule,
        PaginatorModule,
        BrowserModule,
        BrowserAnimationsModule,
        ProjetChimieAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'fr'
        }),
        ProjetChimieSharedModule.forRoot(),
        ProjetChimieCoreModule,
        ProjetChimieHomeModule,
        ProjetChimieAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        ProjetChimieEntityModule,
        ProjetChimieFicheEmpruntProduitModule,
        InputTextModule,
        ButtonModule,
        TabMenuModule,
        KeyFilterModule,
        DropdownModule,
        ToastModule,
        MultiSelectModule,
        TableModule,
        DataTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        MultiSelectModule,
        InputMaskModule,
        InputTextModule,
        InputSwitchModule,
        DropdownModule,
        ButtonModule,
        SplitButtonModule,
        StepsModule,
        CardModule,
        DropdownModule,
        SliderModule,
        ConfirmDialogModule,
        MessagesModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        EmpruntRetourComponent,
        RechercheComponent,
        ProcessusComponent,
        ProcessusDetailComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class ProjetChimieAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
