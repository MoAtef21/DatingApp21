
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from './../../_services/members.service';
import { Member } from './../../_models/member';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone:true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports : [CommonModule , TabsModule , GalleryModule]
})
export class MemberDetailComponent implements OnInit{

   member!: Member;
   images : GalleryItem [] = []; 

 constructor(private membersService : MembersService , private route : ActivatedRoute) {}
 
 ngOnInit(): void {
   this.loadMember();}


 loadMember(){
   const username = this.route.snapshot.paramMap.get('username');
   console.log(username);
   if (!username) return ;
   this.membersService.getMember(username).subscribe({
    next: x => {
      this.member = x
      this.getImages()
    }
   });
   
 }

 getImages(){
  if(!this.member) return;
   for ( const photo of this.member.photos){
    this.images.push(new ImageItem({src: photo.url , thumb: photo.url}))
   }
 }
}
