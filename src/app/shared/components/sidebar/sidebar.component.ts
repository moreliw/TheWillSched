import { Component, ElementRef, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
import { SidebarService } from '../../services/sidebar.service';
import { Util } from '../../common/util';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menu: Menu[] = [];
  tempMenu: Menu[] = [];

  constructor(private el: ElementRef,
              private sidebarService: SidebarService,
              private util: Util) { }

  formatSearch = (text: string) => this.util.removeAccents(text).toLowerCase();

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.sidebarService.getActiveMenu().subscribe(response => {
      this.menu = response.data;
      this.tempMenu = [...this.menu];
    })
  }

  toggle() {
    const { sidebar } = this.getElemnents();

    sidebar.classList.toggle("open");

    this.menuBtnChange();
  }

  searchItemMenu(text: string) {
    this.menu = this.tempMenu.filter(m => this.formatSearch(m.link_name).includes(this.formatSearch(text)))
  }

  menuBtnChange() {
    const {sidebar, closeBtn} = this.getElemnents();

    if (sidebar.classList.contains("open") ){
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");

    } else {
      closeBtn.classList.replace("bx-menu-alt-right","bx-menu");
    }
  }

  getElemnents() {
    const sidebar = this.el.nativeElement.querySelector(".sidebar");
    const closeBtn = this.el.nativeElement.querySelector("#btn");

    return  { sidebar, closeBtn }
  }
}

