import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuleDto } from 'src/app/models/rule-dto';
import { Observable, of } from 'rxjs';
import { RuleResponse } from 'src/app/models/rule-response';
import { MOCK_RULE_RESPONSE } from './mocks/MOCK_RULE_RESPONSE';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private readonly baseUrl = 'https://rules-hackathon.herokuapp.com/api/rule'; // TODO: Get From Ben
  private readonly baseUrl = 'http://localhost:8080/api/rule'; // TODO: Get From Ben

  constructor(private http: HttpClient) { }

  public createRule(ruleDto: RuleDto): Observable<RuleResponse> {
    const url = `${this.baseUrl}/sqlrule`;
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU5MTIyNTM1Nn0.5kIiehwvUmVJpPoIyZ24Q9yRRu304jr3cFHd8tl1ml816fynJOFTooE-M6HOHpb5DrzgR6gqtLm9KoXxL3-fow';
    const fullURL = `${url}?ruleName=${ruleDto.ruleName}&sql=${ruleDto.sql}&message=${ruleDto.message}&level=${ruleDto.level}`;
    //return of(MOCK_RULE_RESPONSE);
    return this.http.post<{ rule: string }>(fullURL, {},
      {
        headers:
          { 'Authorization': 'Bearer ' + token },
          responseType:"text"
      }).pipe(
        map(data => ({rule: data}))
      );
  }
}
