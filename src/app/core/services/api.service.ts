import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuleDto } from 'src/app/models/rule-dto';
import { Observable, of } from 'rxjs';
import { RuleResponse } from 'src/app/models/rule-response';
import { MOCK_RULE_RESPONSE } from './mocks/MOCK_RULE_RESPONSE';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '???'; // TODO: Get From Ben

  constructor(private http: HttpClient) { }

  public createRule(ruleDto: RuleDto): Observable<RuleResponse> {
    const url = `${this.baseUrl}/create-rule`;
    return of(MOCK_RULE_RESPONSE);
    return this.http.post<{rule: string}>(url, ruleDto);
  }
}
