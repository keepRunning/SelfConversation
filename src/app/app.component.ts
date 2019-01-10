import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Message } from './message';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { timeout } from 'q';
import { ActivatedRoute, UrlSegment, ParamMap, Router, Event, ActivationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('highlightMessage', [
    state('highlighted', style({
      backgroundColor: 'lightgoldenrodyellow',
    })),
    state('normal', style({})),
    transition('highlighted => normal', [
      animate('2s')
    ]),
  ])]
})
export class AppComponent implements OnInit {
  title = 'app-selftalk';
  public messages: Message[] = [];
  public person1: string = 'Alice';
  public person2: string = "Bob";
  public inputText;
  public Math = Math;
  public highlightLatestMessage;
  @ViewChild('InputText') public inputTextElementref: ElementRef;

  public constructor(private route: ActivatedRoute, private router: Router) {
    console.log('activatedRoute', route);

    router.events.subscribe((e: Event) => {
      // console.log(e);
      if(e instanceof ActivationEnd)  {
        console.log('ActivationEnd-params', e.snapshot.params);
      }
    });
  }

  public ngOnInit(): void {
    this.inputTextElementref.nativeElement.focus();

    (window as any).messages = this.messages;
    console.log('********** messages object avilable. check this.messages', this.messages);
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
    this.clearTextBox();
    this.highlightLatestMessage = true;
    setTimeout(() => {
      this.highlightLatestMessage = false;
    }, 100);
  }

  private clearTextBox() {
    this.inputTextElementref.nativeElement.value = '';
  }
}