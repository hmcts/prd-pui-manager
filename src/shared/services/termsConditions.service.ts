import { Injectable } from '@angular/core';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TermsConditionsService {
    public getTermsConditions(): Observable<TCDocument> {
        return of({
            version: 1,
            mimeType: 'text/html',
            content: `
                <h1>Test Terms</h1>
                <p>These are mock terms returned by the service until we can integrate the backend.</p>
            `
        });
    }
}
