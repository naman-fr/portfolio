"use client";

import { useEffect } from "react";
// #region agent log
const logDebug = (location: string, message: string, data: any, hypothesisId: string) => {
  const payload = {location,message,data,timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId};
  console.error('[DEBUG ERROR]', payload);
  fetch('http://127.0.0.1:7242/ingest/4c46af64-f425-4826-8dc9-6d583fd34651',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch((e)=>console.error('[DEBUG] Log fetch failed:',e));
};
// #endregion

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // #region agent log
    const errorHandler = (e: ErrorEvent) => {
      logDebug('components/ErrorBoundary.tsx:14','Global error caught',{error:e.message,filename:e.filename,lineno:e.lineno},'E');
    };
    const rejectionHandler = (e: PromiseRejectionEvent) => {
      logDebug('components/ErrorBoundary.tsx:17','Unhandled promise rejection',{reason:String(e.reason)},'E');
    };
    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
    // #endregion
  }, []);

  return <>{children}</>;
}

