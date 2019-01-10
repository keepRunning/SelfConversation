import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { Message } from './message';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { timeout } from 'q';
import { ActivatedRoute, UrlSegment, ParamMap, Router, Event, ActivationEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IndexedDBHelper } from './app-indexedDB-helper.';


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
  public indexedDBHelper = new IndexedDBHelper();
  @ViewChild('InputText') public inputTextElementref: ElementRef;

  private messageCounter: number = 0;
  private customString: string;

  public constructor(private route: ActivatedRoute, private router: Router) {

    router.events.subscribe((e: Event) => {
      // console.log(e);
      if(e instanceof ActivationEnd)  {
        // console.log('ActivationEnd-params', e.snapshot.params);
        if(e.snapshot.params && e.snapshot.params['id']) {
          this.customString = e.snapshot.params['id'];
        }
      }
    });

    this.indexedDBHelper.initializeDB().then(() => {
      this.indexedDBHelper.getData(this.customString).then((res2: any) => {
        console.log('Retrieved data - oninit', res2);
        if(res2 && res2.messageObject) {
          this.messages = res2.messageObject;
        }
      });
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
      m.messageId = this.messageCounter++;
      this.messages.push(m);
    } else {
      let m = this.messages[this.messages.length - 1];
      m.bob = this.inputText;
      m.isComplete = true;

      this.indexedDBHelper.saveMessage(this.messages, this.customString);
    }

    this.clearTextBox();
    this.highlightLatestMessage = true;
    setTimeout(() => {
      this.highlightLatestMessage = false;
    }, 100);
  }

  public clearMessages() {
    this.messages = [];
    this.indexedDBHelper.saveMessage(this.messages, this.customString);
  }

  private clearTextBox() {
    this.inputTextElementref.nativeElement.value = '';
  }
}