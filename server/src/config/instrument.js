// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://7684e5a0eb9b67d146635fec1c55299f@o4508408152653824.ingest.us.sentry.io/4508408155406336",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],

  // Tracing
//   tracesSampleRate: 1.0, // Capture 100% of the transactions
});

// Manually call startProfiler and stopProfiler
// to profile the code in between
Sentry.profiler.startProfiler();

// Starts a transaction that will also be profiled
Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // the code executing inside the transaction will be wrapped in a span and profiled
  }
);

// Calls to stopProfiling are optional - if you don't stop the profiler,
// your application will keep profiling until the process exits or stopProfiling is called.
Sentry.profiler.stopProfiler();