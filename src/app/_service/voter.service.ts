import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API, StorageService } from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multi-part/formdata" })
}

export class VoterDto{
  id: number;
  fname: string;
  lname: string;
  blk: number;
  lot: number;
  age: number;
  email: string;
  migs: boolean; 
  directMember: boolean;
  username: string;
  tempPassword: string;
  password: string;
  status: string;
  activatedDate: string;
  lastLogin: string;
  votedDate: string;
  roles: {id : number, name : string}[];
}

export class UpdatePassDto{
  username: string;
  temppass: string;
  password: string;
  repeatpassword: string;
}

export class VoteDTO{
  id: number;
  candidates: number[];
  constructor(id: number, candidates: number[]){
    this.id = id;
    this.candidates = candidates;
  }
}

 
@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http: HttpClient, private store: StorageService) { }

  bulkInsert(bulkfile: File): Observable<any> {
    console.log(bulkfile);
    const formData: FormData = new FormData();

    formData.append('file', bulkfile);
    return this.http.post(
      BASE_API + '/voter/bulk',formData,
      {
        reportProgress: true,
        responseType: 'json',
        headers: new HttpHeaders({ Authorization: 'Bearer ' + this.store.getUser().token })
      },
    );
  }

  addVoter(voter: VoterDto): Observable<any> {
    console.log(voter); 

    return this.http.post(
      BASE_API + '/voter' ,voter,
      {
        headers: this.store.getHeaders()
      }
    );
  }

  updatePass(dto: UpdatePassDto): Observable<any> {
    console.log(dto); 

    return this.http.post(
      BASE_API + '/voter/pass' , dto,
      {
        headers: this.store.getHeaders()
      }
    );
  }

  getUsers(): Observable<Array<VoterDto>> {
    return this.http.get<Array<VoterDto>>(
      BASE_API + '/voter',
      {
        headers: this.store.getHeaders()
      }
    );
  }

  getUser(id: number): Observable<VoterDto> {
    return this.http.get<VoterDto>(
      BASE_API + '/voter/' + id,
      {
        headers: this.store.getHeaders()
      }
    );
  }

  updateVoter(voter: VoterDto): Observable<VoterDto> {
    console.log(voter); 

    return this.http.put<VoterDto>(
      BASE_API + '/voter/' + voter.id ,voter,
      {
        headers: this.store.getHeaders()
      }
    );
  }

  deleteVoter(id: any): Observable<any> {
    console.log("deleted id: " + id); 

    return this.http.delete(
      BASE_API + '/voter/' + id, {
        headers: this.store.getHeaders()
      }
    );
  }

  resetVoter(id: any): Observable<any> {
    console.log("user reset id: " + id); 

    return this.http.post(
      BASE_API + '/voter/reset/' + id, {
        headers: this.store.getHeaders()
      }
    );
  }

  submitVote(dto : VoteDTO): Observable<any> {

    return this.http.post(
      BASE_API + '/vote', dto,  {
        headers: this.store.getHeaders()
      }
    );
  }



}
