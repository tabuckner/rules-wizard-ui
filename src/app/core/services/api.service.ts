import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RuleDto } from 'src/app/models/rule-dto';
import { Observable } from 'rxjs';
import { RuleResponse } from 'src/app/models/rule-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private readonly baseUrl = 'https://rules-hackathon.herokuapp.com/api/rule'; // TODO: Get From Ben
  private readonly baseUrl = 'http://localhost:8080/api/rule'; // TODO: Get From Ben

  constructor(private http: HttpClient) { }

  public createRule(ruleDto: RuleDto): Observable<RuleResponse> {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU5MTIyNTM1Nn0.5kIiehwvUmVJpPoIyZ24Q9yRRu304jr3cFHd8tl1ml816fynJOFTooE-M6HOHpb5DrzgR6gqtLm9KoXxL3-fow';
    const url = `${this.baseUrl}/sqlrule`;
    const params = new HttpParams({ fromObject: { ...ruleDto } });
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const options = {
      params,
      headers,
      responseType: 'text' as 'json'
    };

    // return of(MOCK_RULE_RESPONSE);
    return this.http.post(url, {}, options).pipe(
      map(data => ({ rule: data } as RuleResponse))
    );
  }
}
