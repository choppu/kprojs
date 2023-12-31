/********************************************************************************
 *   Ledger Node JS API
 *   (c) 2016-2017 Ledger
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 ********************************************************************************/
export interface Log {
  type: string;
  message?: string;
  data?: any;
  // unique amount all logs
  id: string;
  // date of the log
  date: Date;
  context?: TraceContext;
}

export type Unsubscribe = () => void;
export type Subscriber = (arg0: Log) => void;
export type TraceContext = Record<string, unknown>;
export type LogData = any;
export type LogType = string;