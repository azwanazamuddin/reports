---
title: "SIP seminar: the deck, the handouts, and how they were made"
type: report
status: final
created: 2026-10-23
updated: 2026-10-26
tags: [phd, sip, slides, policy, matsim]
---

**[Open the deck](/slides/sip-seminar/)** · [PDF of the deck as presented](/slides/sip-seminar/files/sip_seminar_20261023.pdf)
· handouts in [English](/slides/sip-seminar/files/handout_en_20261023.pdf) and
[Japanese](/slides/sip-seminar/files/handout_ja_20261023.pdf)

The talk was given at the SIP Machigurumi simulator progress seminar on Friday 23 October 2026,
15:25 to 15:50, at Mirai Crea, Hiroshima University. It ran 25 minutes, and questions went to the general
discussion afterwards. The audience was stakeholders, not choice modellers, so the deck explains what a
demand model is before it shows any result. Authors: Azwan Nazamuddin and Makoto Chikaraishi.

> [!warning] One estimation round, not the final model
> The results come from the specification estimated on 22 October. The model was re-specified on
> 24 October (a new public transport skim, public transport time estimated rather than fixed, a clock
> repair in the diaries), so every number below will change after the re-estimate.

## What the talk says

The opening question is the planner's: **if a BRT opens, how will behaviour change?** The talk answers it
in four steps.

1. **Trips are linked.** A demand model that treats trips one at a time cannot see that a later bus home
   moves the shopping trip. Five approaches are compared (trip-based, classic activity-based, MATSim's
   default loop, choice models, the dynamic discrete choice model), with MATSim framed as our simulator and
   partner: it assigns, we choose.
2. **People face different constraints.** Using the space-time prism: a parent who has to collect a child
   cannot reach the shop at 18:00, and a model that ignores that reads it as a dislike of shopping. Exact
   constraints for every person are expensive, which is the reason this work exists.
3. **Our approach.** Two slots, what people want and what people can do. Four constraint types
   (institutional, capability, anchor, interdependent), and one shared map with a mask for each person.
4. **Results and policy**, then integration with MATSim, limits and conclusions.

## What the results showed

| | |
|---|---|
| Estimation sample | 6,451 persons aged 13 and over, weekday diaries, 144 zones |
| Parameters | 70 preference parameters estimated together |
| Values of time | car 79, walk 65, bicycle 48 yen per minute; public transport fixed at 20.4 from a trip-level model |
| Fit | modes, the rhythm of the day, trip counts and leisure destinations reproduced; **shopping destinations too spread** |
| BRT | about 1 yen per person-day on average; 3.1% of persons gain, a few more than 100 yen; bus and train share 15.25% to 15.29% |
| City-wide policies | public transport 20% faster: +61 yen; half fares: +93 yen; dearer parking in three central zones: a few yen lost by car users |
| MATSim | base and BRT day plans run end to end on a 9% sample, as a first test |

The BRT effect is small because, in this setup, the BRT only changes travel times on one corridor. The
city-wide policies show the model itself can respond. The talk's reading: look at the distribution of
gains, not the average.

**What it cannot do yet**, as stated on the limits slide: one weekday per person, work duration taken from
the diary, static road times unless the MATSim loop runs, the BRT as faster buses only, and shopping
destinations that do not fit (the zone's number of shops stands in for store size, and external cities are
summed into one zone).

## How the deck was made

Taken from the session handoff, 20 to 23 October.

- **House style.** The layout follows svrnm/context-propagation-slides (CC BY 4.0, credited on the
  references slide) with our own palette, deep teal and coral. Diagrams are drawn by hand in rough.js and
  build up one click at a time; the animations are made with manim on the same prism grid, so the visual
  thread stays the same from slide to slide. This style is now the template for every later deck.
- **Restructured for a non-specialist audience.** Every concept slide opens with a full-sentence
  definition, and a glossary is at the end. Outcomes are phrased as **behaviour change and accessibility
  change**, with accessibility being the value of everything a person could do, in yen.
- **Position.** The position is managing constraint heterogeneity properly. The shared maps and personal
  masks are the means, not the position. A frontier slide and a "what is new here, and what is not" slide
  mirror Paper A's list of claims it must not make.
- **Speaker notes** on every main slide carry a running clock, click markers and "if asked" answers with
  sources. The timed talk came to 24:45.
- **Results** were filled in the night before the talk from the final estimate of 22 October and its
  robust standard errors. Maps are static images, because the interactive versions need tiles from the
  internet. The BRT animation was re-rendered with the real numbers.
- **BRT results come from the DDCM alone.** MATSim's public transport carried 0.8 to 2.8% of trips against
  13% in the diaries, so its public transport numbers were not shown.
- **Handouts**: four A4 pages in English and Japanese (制度的／能力的／アンカー／相互依存制約 for the four
  constraint types; 時空間プリズム for the prism).

## What came after

- The model was re-specified on 24 October, and the re-estimate is the next result. See
  [[2026-10-25-paper-a-progress|Paper A progress]].
- The shopping misfit and "the BRT is only a time change" are both specification items for that
  round, together with a closed loop with MATSim (lanes, congestion, the full population).
- The talk's second take-home, that every person keeps their own constraints, is the subject of the
  [[2026-10-25-phd-framework|PhD framework deck]].
