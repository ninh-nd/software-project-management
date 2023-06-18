interface Sample {
  interface: string;
  sampleCode: string;
}
interface CreateNewScanner {
  name: string;
  config: {
    installCommand: string;
    code: string;
  };
}
interface Scanner {
  name: string;
  createdBy: string;
  config?: {
    installCommand: string;
    code: string;
  };
}
