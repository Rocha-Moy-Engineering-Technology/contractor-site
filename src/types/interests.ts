export interface Interest {
  readonly label: string;
  readonly description: string;
}

export const INTERESTS: readonly Interest[] = [
  {
    label: 'Machine Learning & AI',
    description:
      'Building ML models and AI systems with governance and auditability',
  },
  {
    label: 'Agentic Development',
    description:
      'Designing agentic solutions with custom data and RAG pipelines',
  },
  {
    label: 'Data Engineering',
    description:
      'Distributed computing pipelines, ETL, and data lake architectures',
  },
  {
    label: 'Natural Language Processing',
    description:
      'NLP models for text extraction, classification, and knowledge bases',
  },
  {
    label: 'Full-Stack Development',
    description:
      'End-to-end applications from prototype to production-grade products',
  },
  {
    label: 'Cloud & DevOps',
    description:
      'Autoscaling infrastructure, IaC, and cloud-agnostic deployments',
  },
  {
    label: 'Quantitative Finance',
    description:
      'Algorithmic trading, portfolio optimization, and risk management',
  },
  {
    label: 'Data Science',
    description:
      'Statistical modeling, feature engineering, and business intelligence',
  },
] as const;
