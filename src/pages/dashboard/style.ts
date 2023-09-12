import styled from "styled-components";

export const DashboardContainer = styled.div`
`

export const SalesVolumeContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .one {
    color: rgba(0, 0, 0, 0.85);
    font-size: 38px;
  }

  .two {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    .anticon {
      margin-left: 3px;
    }
  }
`

export const NumberOfVisitsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;

  .number-of-visits {
    font-size: 38px;
    color: rgba(0, 0, 0, 0.85);
    padding: 0;
    height: 40px;
    line-height: 40px;
  }

  .content {
    flex: 1;
    padding: 0;
  }
`

export const NumberOfPaymentsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;

  .number-of-visits {
    font-size: 38px;
    color: rgba(0, 0, 0, 0.85);
    padding: 0;
    height: 40px;
    line-height: 40px;
  }

  .content {
    flex: 1;
    padding: 0;
  }
`

export const EffectOfOperatingActivitiesContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 5px;

  .number-of-visits {
    font-size: 38px;
    color: rgba(0, 0, 0, 0.85);
    padding: 0;
    height: 40px;
    line-height: 40px;
  }

  .content {
    flex: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const EffectOfOperatingActivitiesFooterContainer = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;

  .anticon {
    margin-left: 3px;
  }
`


export const IntrolduceRowColItemContainer = styled.div`
  height: 185px;
  padding: 20px 24px 8px 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  .item-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .item-content {
    flex: 1;
  }

  .bottom-container {
    padding-top: 5px;
    height: 25px;
    border-top: 1px solid #f0f0f0;
    color: rgba(0, 0, 0, 0.85);
  }
`

export const SalesCardContainer = styled.div`
  padding: 20px 24px 8px 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;

  .sale-tabs-content {
    display: flex;
  }

  .sale-right-tabs-container {
    .two-sales-volume-tabs-container {
      display: flex;
      flex-direction: column;
    }
  }

  .tabs-container {
    flex: 1;
    width: 100%;
    height: 480px;
  }

  .two-tabs-container {
    width: 100%;
    height: 480px;
  }

  .ranking-list-container {

    padding-left: 50px;

    .title {
      color: rgba(0, 0, 0, .85);
      padding-bottom: 0.5em;
    }

    .ranking-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 25px;
      margin-top: 12px;
      color: rgba(0, 0, 0, .85);
    }

  }

`

export const ThreeClassContainer = styled.div`
  padding: 20px 24px 8px 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  min-height: 800px;

  .row-container {
    width: 100%;
    padding-bottom: 20px;
  }
  
`