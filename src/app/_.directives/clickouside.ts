import {Directive, ElementRef, Output, EventEmitter, HostListener, NgModule} from '@angular/core';
 
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
    }
 
    @Output()
    public clickOutside = new EventEmitter();
 
    @HostListener('document:click', ['$event'])
    clickout(event) {
        const clickedInside = this._elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}

@Directive({
    selector: "[click-stop-propagation]"
})
export class ClickStopPropagation
{
    @HostListener("click", ["$event"])
    public onClick(event: any): void
    {
        event.stopPropagation();
    }
}

@NgModule({
    imports: [],
    declarations: [ClickOutsideDirective, ClickStopPropagation],
    exports: [ClickOutsideDirective, ClickStopPropagation]
})
export class ClickOutsideDirectiveModule { }