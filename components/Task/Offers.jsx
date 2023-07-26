import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import data from "../../utils/data";
import Offer from "./Offer";

const style = {
  subSection: `py-5 border-b pr-6`,
  subSectionHeader: `text-xl mb-5`,
  list: `text-sm`,
  listItem: `mb-2`,
  listName: `font-semibold`,
  listValue: `ml-1`,
  pagination: `flex items-center justify-center py-4`,
  heroIcon: `h-4 w-4 cursor-pointer`,
  pageNumbers: `flex items-center`,
  pageNumber: `mx-2 cursor-pointer`,
  activePage: `font-bold`,
};

const Offers = ({ offers, assigned, isProxzi, task }) => {
  const [expandedOffer, setExpandedOffer] = useState();
  const [page, setPage] = useState(1);

  const handleSelectPage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(offers.length / 2) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const handleExpand = (index) => {
    if (expandedOffer === index) {
      setExpandedOffer();
    } else {
      setExpandedOffer(index);
    }
  };

  return (
    <View className={style.subSection}>
      {/* <h3 className={style.subSectionHeader}>Offers</h3>
      <ul className={style.list}>
        {offers?.slice(page * 2 - 2, page * 2).map((offer, index) => (
          <Offer
            task={task}
            offer={offer}
            assigned={assigned}
            last={
              offer.proxzi.id === offers[offers.length - 1].proxzi.id ||
              index % 2 !== 0
            }
            expandedOffer={expandedOffer}
            handleExpand={handleExpand}
            key={index}
            index={index}
            isProxzi={isProxzi}
          />
        ))}
      </ul>
      {offers.length > 0 && (
        <View className={style.pagination}>
          <View
            className={style.arrow}
            onClick={() => handleSelectPage(page - 1)}
          >
            <ChevronLeftIcon className={style.heroIcon} />
          </View>
          <View className={style.pageNumbers}>
            {[...Array(Math.ceil(offers?.length / 2))].map((n, i) => (
              <View
                onClick={() => handleSelectPage(i + 1)}
                className={`${style.pageNumber} ${
                  page === i + 1 && style.activePage
                }`}
              >
                {i + 1}
              </View>
            ))}
          </View>
          <View
            className={style.arrow}
            onClick={() => handleSelectPage(page + 1)}
          >
            <ChevronRightIcon className={style.heroIcon} />
          </View>
        </View>
      )} */}
    </View>
  );
};

export default Offers;
