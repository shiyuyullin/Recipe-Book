import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen: boolean = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2){}


    @HostListener('click') onClickDropdown(){
        console.log("here");
        this.isOpen = !this.isOpen;
    }

}