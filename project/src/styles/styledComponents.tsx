import { styled } from '@kuma-ui/core'

export const ResponsiveBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  width: 30%;
  justify-content: flex-end;
  @media (max-width: 900px) {
    display: none;
    width: 100%;
  }
`

export const TrophyDisplay = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 900px) {
    display: none;
  }
`

export const CalendarGridResponsive = styled.div`
  width: 448px;

  @media (max-width: 900px) {
    width: 100%;
  }
`

export const SettingsText1 = styled.div`
  color: var(--on-surface-lv1);
  margin-left: 10px;
  margin-top: 10px;
  font-size: 14px;
`;

export const SettingsText2 = styled.div`
  color: var(--on-surface-lv2);
  margin-left: 10px;
  margin-top: 20px;
  font-size: 12px;
`;

export const Divider = styled.div`
  border-bottom=1px solid var(--on-surface-lv2);
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
`
export const StandingsText = styled.div`
  font-size: 14px;
  color: grey;
  flex: 1 1 30px;
  text-align: center;
`

export const StandingsValuesBox = styled.div`
  flex: 1 1 30px;
  text-align: center;
`

export const StandingsValuesText = styled.div`
  font-size: 14px;
  color: var(--on-surface-lv1);
`