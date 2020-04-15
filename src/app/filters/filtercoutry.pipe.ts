import { Pipe, PipeTransform, NgModule } from '@angular/core';
@Pipe({
    name: 'filtercountry'
})
export class filtercountryPipe implements PipeTransform {
    transform(items: any[], filterCountryCode: any): any[] {
        if (!items) return [];
        if (!filterCountryCode) {
            return items;
        }
        filterCountryCode = filterCountryCode ? filterCountryCode.toLowerCase() : '';

        if(filterCountryCode=='all') {
            return items;
        }

        if (filterCountryCode) {
            return items.filter(item => {
                return item.symbol.toLowerCase() == filterCountryCode;
            });
        }
    }
}

@NgModule({
    imports: [],
    declarations: [filtercountryPipe],
    exports: [filtercountryPipe]
})
export class filtercountryPipeModule { }