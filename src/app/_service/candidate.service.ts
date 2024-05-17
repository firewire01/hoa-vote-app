import { Injectable } from '@angular/core';
import { ConfigState } from '../objects/config.state';
import { BehaviorSubject, Observable } from 'rxjs';
import { CandidateDto } from '../objects/candidate-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API, StorageService } from './storage.service';
import { VoteDTO } from './voter.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const HttpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multi-part/formdata" })
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private subject = new BehaviorSubject<ConfigState>(new ConfigState());

  state = this.subject.asObservable();

  storeConfig = new ConfigState();

  bodVotes = new VoteDTO(0, []);

  grievanceVotes = new VoteDTO(0, []);

  constructor(private http : HttpClient, private store: StorageService) { 
    this.state.subscribe((state) => (this.storeConfig = state));
  }

  buildDtOptions(url: string): Observable<CandidateDto[]> {
    return this.http.get<CandidateDto[]>(
       url, {
        headers: this.store.getHeaders()
      }
    );
  }

  getCandidate(id: number ): Observable<CandidateDto>{
    return this.http.get<CandidateDto>(BASE_API + '/candidate/' + id, {
      headers: this.store.getHeaders()
    });
  }

  addCandidate(entry : CandidateDto) : Observable<CandidateDto>{
    return this.http.post<CandidateDto>(BASE_API + '/candidate', {
      headers: this.store.getHeaders()
    });
  }
  
}

