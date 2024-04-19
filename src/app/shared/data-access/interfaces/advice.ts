export interface Advice {
  name: string | null;
  number: number | null;
}

export interface AdviceSlipResponse {
  slip: SlipAdvice;
}

interface SlipAdvice {
  id: number;
  advice: string;
}
