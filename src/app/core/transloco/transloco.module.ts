import { Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import {Observable} from 'rxjs';

@NgModule({
    exports  : [
        TranslocoModule
    ],
    providers: [
        {
            // Provide the default Transloco configuration
            provide : TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs      : [
                    {
                        id   : 'vi',
                        label: 'lang.vi'
                    },
                    {
                        id   : 'en',
                        label: 'lang.en'
                    },
                ],
                defaultLang         : 'vi',
                fallbackLang        : 'vi',
                reRenderOnLangChange: true,
                prodMode            : environment.production,
                missingHandler: {
                    useFallbackTranslation: true,
                    logMissingKey: false
                }
            })
        },
        {
            // Provide the default Transloco loader
            provide : TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide   : APP_INITIALIZER,
            deps      : [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): Observable<Translation> => {
                const defaultLang = translocoService.getDefaultLang();
                const config = JSON.parse(localStorage.getItem('config'));
                if (config && config?.language) {
                    translocoService.setActiveLang(config.language);
                } else {
                    translocoService.setActiveLang(defaultLang);
                }
                return translocoService.load(defaultLang).pipe();
            },
            multi     : true
        }
    ]
})
export class TranslocoCoreModule
{
}
