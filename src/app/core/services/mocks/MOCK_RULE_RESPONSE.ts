import { RuleResponse } from 'src/app/models/rule-response';

export const MOCK_RULE_RESPONSE: RuleResponse = {
rule: `
// Copyright (c) 2020 Datical, Inc. All Rights Reserved.
/*
@author Taylor Buckner
@version 1.0
@date June 2, 2020
@description Error if GRANT is detected
*/

package com.datical.hammer.core.sqlrules.java

import com.datical.db.project.Project;
import com.datical.hammer.core.rules.Response;
import com.datical.hammer.core.rules.Response.ResponseType;
import com.datical.hammer.core.rules.WithComments;
import com.datical.hammer.core.rules.WithoutComments;

rule "Error when GRANTs are in SQL Scripts"
  salience 1
  when
    wc : WithComments(getText().toLowerCase() contains "grant" )
  then
    String errorMessage =
      "GRANT found in file " +
      wc.getSqlFile().getName() + " on lines: " + wc.getLineNumbers("grant");
    insert(new Response(ResponseType.FAIL, errorMessage, drools.getRule().getName()));
  end
`
};
