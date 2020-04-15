import { Pipe, PipeTransform, NgModule} from '@angular/core';
@Pipe({
    name: 'orderBy'
})
export class orderByPipe implements PipeTransform {
    transform(items: any[], order: any, direction: any): any[] {
        if (!items) return [];
        if(!order) {
            return items;
        }
        direction = direction=='desc'? 1 : -1;
        return items.sort(function(a, b){
            if(order == 'dateCreated') {
                if(Date.parse(a[order]) < Date.parse(b[order])){
                    return -1 * direction;
                }
                else if( Date.parse(a[order]) > Date.parse(b[order])){
                    return 1 * direction;
                }
                else{
                    return 0;
                }
            } else {
                if(a[order] < b[order]){
                    return -1 * direction;
                }
                else if( a[order] > b[order]){
                    return 1 * direction;
                }
                else{
                    return 0;
                }
            }
            
        });
    }
}

@NgModule({
    imports: [],
    declarations: [orderByPipe],
    exports: [orderByPipe]
  })
  export class orderByPipeModule { }