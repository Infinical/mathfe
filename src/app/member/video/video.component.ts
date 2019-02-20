import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'ag-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  params: any;
  id: any;
  isVimeo = false;
  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params =>
      this.id = params['id']);
    this.isVimeo = false;
    if (this.id.indexOf('vimeo') != -1) {
      this.isVimeo = true;
      this.id = this.sanitizeVimeo(this.id);
    }
  }
  sanitizeVimeo(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.params.unsubscribe();
    $('video').first().attr('src', '');
  }
}
