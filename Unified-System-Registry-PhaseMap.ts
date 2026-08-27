// Unified-System-Registry-PhaseMap.ts
// Deterministic phase→engine mapping for Beast System 3.0.
// Produces authoritative lifecycle bindings from the Unified System Registry.

import {
  UnifiedSystemRegistry,
  EngineDeclaration,
  PhaseId
} from "./Unified-System-Registry-Core";

export class PhaseMapBuilder {
  constructor(private readonly registry: UnifiedSystemRegistry) {}

  build(): Record<PhaseId, ReadonlyArray<EngineDeclaration>> {
    const phases: PhaseId[] = [
      "init",
      "identity",
      "temporal",
      "resonance",
      "equilibrium",
      "governance",
      "execution",
      "ledger",
      "finalization"
    ];

    const map: Record<PhaseId, EngineDeclaration[]> = {
      init: [],
      identity: [],
      temporal: [],
      resonance: [],
      equilibrium: [],
      governance: [],
      execution: [],
      ledger: [],
      finalization: []
    };

    for (const phase of phases) {
      const engines = this.registry.enginesForPhase(phase);
      if (engines.length === 0) {
        throw new Error(
          `Deterministic violation: no engines bound to phase '${phase}'.`
        );
      }
      map[phase] = engines;
    }

    return map;
  }
}

// Example usage
export function createPhaseMap(reg: UnifiedSystemRegistry) {
  const builder = new PhaseMapBuilder(reg);
  return builder.build();
}
