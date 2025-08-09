"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";
import { subjects } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: searchQuery,
      });

      router.push(newUrl, { scroll: false });
    } else {
      if (pathname === "/companions") {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["subject"],
        });
        router.push(newUrl, { scroll: false });
      }
    }
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <Select value={searchQuery} onValueChange={(e) => {
      if (e === 'all') {
        setSearchQuery("");
      } else {
        setSearchQuery(e);
      }
    }} >
      <SelectTrigger className="input">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem value={subject} key={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
