import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Skill } from '../../models/skill';
declare var jQuery:any;
declare var $ :any;

@Component({
  selector: 'ag-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {
  params: any;
  id: any;

  constructor(private activatedRoute:ActivatedRoute,) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnDestroy() {
    this.params.unsubscribe();
    $('video').first().attr('src','');
  }
}
