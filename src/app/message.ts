export class Message {
    
    private _alice : string;
    public get alice() : string {
        return this._alice;
    }
    public set alice(v : string) {
        this._alice = v;
    }

    
    private _bob : string;
    public get bob() : string {
        return this._bob;
    }
    public set bob(v : string) {
        this._bob = v;
    }

    
    private _isComplete : boolean;
    public get isComplete() : boolean {
        return this._isComplete;
    }
    public set isComplete(v : boolean) {
        this._isComplete = v;
    }
    
}