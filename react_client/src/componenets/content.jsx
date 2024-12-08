/** @format */

import React, { useEffect, useRef, useState } from "react";

import { CardIndex } from "../componenets/pages/card/cardIndex";
import { CheckBalanceAccordian } from "../componenets/pages/checkBalanceAccordian/checkBalanceAccordian";
import { TransactionHistoryAccordian } from "../componenets/pages/transactionHistoryAccordian/transactionHistoryAccordian";

export const ContentIndex = (props) => {
  const [categoryId, setCategoryId] = useState(0);

  const [categoryDetail, setCategoryDetail] = useState();

  useEffect(() => {
    if (props.detail != undefined) {
      setCategoryId(props.index);

      setCategoryDetail(props.detail);
    }
  }, [props]);

  const cardRef = useRef(null);
  const txhistroyRef = useRef(null);

  const refreshData = () => {
    cardRef.current.setAllValues();
    txhistroyRef.current.setAllValues();
  };

  return (
    <>
      <div className='dashboard-content contract-detail'>
        <CardIndex
          index={categoryId}
          categoryDetail={categoryDetail}
          callBack={() => refreshData()}
          ref={cardRef}
        />
      </div>
      <div className='dashboard-content accordian mb-4'>
        <TransactionHistoryAccordian
          index={categoryId}
          callBack={() => refreshData()}
          ref={txhistroyRef}
        />

        <CheckBalanceAccordian />
      </div>
    </>
  );
};
