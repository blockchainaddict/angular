// This file is part of the App module, and it defines the logic
// the functions and variables that you want available within the .html file!

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  newMemberName = ""; //empty strings can be initialized without specifying type
  members: string[] = []; //this is an array of strings
  member= "";
  errorMsg = "";

  numberOfTeams: number | "" = ""; //this will be either a number or an empty string
  groups: string[][] = []; //this is how you creat an array of arrays in TS

  // updates the input field value
  onChange(name: string){
    this.newMemberName = name;
  }

  onNumberOfTeamsInput(value: string){
    this.numberOfTeams = Number(value);
  }

  // to add a new member
  addMember(){
    // if for ERROR Handling - to avoid sending an empty name
    if(this.newMemberName!=""){
      this.members.push(this.newMemberName);
      this.newMemberName = '';
      this.errorMsg='';
    }
    else{
      this.errorMsg="Please enter a name";
    }
  }

  generateTeam(){

    if(!this.numberOfTeams || this.numberOfTeams <= 0){
      this.errorMsg = "Invalid input";
        return;
    }

    const allMembers = [...this.members];
    this.errorMsg = "";

    if(this.members.length<=0 || this.members.length < this.numberOfTeams){
      this.errorMsg = "Can't create more groups than people available";
      return;
    }

    while(allMembers.length){
      for(let i=0; i < this.numberOfTeams; i++){
        const randomIndex = Math.floor(Math.random() * allMembers.length)
        const member = allMembers.splice(randomIndex, 1)[0];
        if(!member)break;
  
        if(this.groups[i]){
          this.groups[i].push(member)
        }
        else{
          this.groups[i] = [member];
        }
      }
    }

    this.numberOfTeams = "";
    this.members = [];
  }
}