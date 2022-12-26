import React, { useCallback, useMemo } from "react";
import { useBookmarksContext } from "../Context";
import { StoredProduct } from "../models/Product";

const useBookmark = (id: StoredProduct["id"]) => {
  const { bookmarks, dispatch } = useBookmarksContext();
  const addBookmark = useCallback((Product: StoredProduct) => {
    dispatch({ type: "add", payload: { Product } });
  }, []);
  const removeBookmark = useCallback(() => {
    dispatch({ type: "remove", payload: { id } });
  }, []);
  const isBookmarked = useMemo(() => {
    return bookmarks.some((m) => m.id === id);
  }, [bookmarks]);
  return [addBookmark, removeBookmark, isBookmarked] as const;
};

export default useBookmark;
