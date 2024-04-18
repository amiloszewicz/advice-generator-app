export interface Advice {
  name: string | null;
  number: number;
}

export interface AdviceSlipResponse {
  slip: SlipAdvice;
}

interface SlipAdvice {
  id: number;
  advice: string;
}
