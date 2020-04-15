import { Pipe, PipeTransform, NgModule} from '@angular/core';
@Pipe({
    name: 'filtercrypto'
})
export class filtercryptoPipe implements PipeTransform {
    filterarray:any;
    transform(items: any[], filterCryptoCode: any, filterCountryCode:any): any[] {
        this.filterarray = items;
        if (!items) return [];
        if(!filterCryptoCode && !filterCountryCode) {
            return items;
        }
        filterCryptoCode = filterCryptoCode ? filterCryptoCode.toLowerCase() : '';
        filterCountryCode = filterCountryCode ? filterCountryCode.toLowerCase() : '';

        if(filterCryptoCode=='all' && filterCountryCode =='all') {
            return items;
        }

        if(filterCryptoCode != 'all') {
            return items.filter(item => {
                return item.symbol.toLowerCase() == filterCryptoCode;
            });  
        } 
        if (filterCountryCode) {
            return items.filter(item => {
                return item.country.code.toLowerCase() == filterCountryCode;
            });
        } else {
            return items;
        }
        
    }
}

@NgModule({
    imports: [],
    declarations: [filtercryptoPipe],
    exports: [filtercryptoPipe]
  })
  export class filtercryptoPipeModule { }