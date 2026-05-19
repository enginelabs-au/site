export type ClarifyResponse = {
  type: "clarify";
  turn: number;
  preface: string;
  questions: string[];
  internal_state?: Record<string, unknown>;
};

export type RecommendationResponse = {
  type: "recommendation";
  outcome: "recommend" | "escalate" | "decline";
  summary_in_visitor_framing: string;
  classification: {
    engine_fit: string[];
    scope_size: string;
    risk_tier: string;
    data_class: string;
    confidence: number;
    rationale: string;
  };
  recommended_engines: Array<{
    slug: string;
    name: string;
    why_it_fits: string;
    tier: string;
    price_band_aud: string;
    typical_timeline_weeks: string;
    what_visitor_provides: string[];
    exclusions: string[];
  }>;
  sensitive_area_flag: boolean;
  sensitive_area_reason: string;
  suggested_next_step: string;
  decline_or_escalation_message: string;
  draft_sow_seed: {
    project_snapshot: string;
    business_outcome: string;
    included_deliverables: string[];
    exclusions: string[];
    milestones: string[];
    price_aud: string;
    assumptions: string[];
  };
  /** Pre-filled contact form message — generated per visitor thread. */
  contact_handoff: {
    email_subject: string;
    email_body: string;
  };
};

export type RecommenderResponse = ClarifyResponse | RecommendationResponse;

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};
