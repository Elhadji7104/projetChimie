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
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { EmpruntRetour2Component } from './emprunt-retour2/emprunt-retour2.component';
import { ProjetChimieFicheEmpruntProduitModule } from './entities/fiche-emprunt-produit/fiche-emprunt-produit.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

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
        ButtonModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        EmpruntRetour2Component
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
