import { Directive, ElementRef, Input, NgModule, NgZone } from '@angular/core';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective {

    @Input('infiniteScroll') loadMore;
  constructor(lc: NgZone) {

    window.onscroll = () => {
        let windowHeight = "innerHeight" in window ? window.innerHeight
            : document.documentElement.offsetHeight;
        let body = document.body, html = document.documentElement;
        let docHeight = Math.max(body.scrollHeight,
            body.offsetHeight, html.clientHeight,
            html.scrollHeight, html.offsetHeight);
        let windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.loadMore();
        }
        lc.run(() => {
            
          });
     };
  }

 

  

}

@NgModule({
    declarations:[InfiniteScrollDirective],
    exports:[InfiniteScrollDirective]
})
export class InfiniteScrollModule { }