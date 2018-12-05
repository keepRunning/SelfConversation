import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-selftalk';
  public messages: Message[] = [];
  public person1: string = 'Alice';
  public person2: string = "Bob";
  public inputText;
  public Math = Math;
  @ViewChild('InputText') public inputTextElementref: ElementRef;


  public ngOnInit(): void {
    this.inputTextElementref.nativeElement.focus();
  }

  public keydown(k: any) {
    if (k.key == 'Enter' && !k.shiftKey) {
      this.addToConversation();
      return false;
    } else if (k.key == 'Enter' && k.shiftKey) {
      this.inputText += '\n';
      return false;
    }
  }

  public addToConversation() {
    if (this.messages.length === 0 || this.messages[this.messages.length - 1].isComplete) {
      let m = new Message();
      m.alice = this.inputText;
      this.messages.push(m);

    } else {
      let m = this.messages[this.messages.length - 1];
      m.bob = this.inputText;
      m.isComplete = true;
    }
    console.log(this.inputText);
    this.clearTextBox();
  }

  private clearTextBox() {
    this.inputTextElementref.nativeElement.value = '';
    console.log(this.inputTextElementref.nativeElement);
  }
}