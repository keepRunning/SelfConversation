import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-selftalk';
  @ViewChild('MyWords') private myWords: ElementRef;
  public messages: Message[] = [];
  public person1: string = 'Alice';
  public person2: string = "Bob";

  public keydown(k: any) {
    if (k.key == 'Enter') {
      this.addToConversation(this.myWords.nativeElement.value);
    }
  }

  public addToConversation(newWords: string) {
    if (this.messages.length === 0 || this.messages[this.messages.length - 1].isComplete) {
      let m = new Message();
      m.alice = newWords;
      this.messages.push(m);

    } else {
      let m = this.messages[this.messages.length - 1];
      m.bob = newWords;
      m.isComplete = true;
    }
    this.clearTextBox();
  }

  private clearTextBox() {
    this.myWords.nativeElement.value = '';
  }
}