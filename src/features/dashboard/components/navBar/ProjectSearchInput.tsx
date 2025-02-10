import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import { useNavigate } from "react-router";
import useFetch from "@/hooks/useFetch";

import { Briefcase, Loader2, Search } from "lucide-react";
import { Project } from "@/ts/shared.types";

type Props = {
  className?: string;
};

const ProjectSearchInput = ({ className }: Props) => {
  const { data: projects, loading } = useFetch<Project[]>("/project");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showUserCards, setShowUserCards] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!projects) return;

    const term = event.target.value;
    setSearchTerm(term);

    const filtered = projects.filter((project) => {
      const projectName = project.name;
      return projectName.toLowerCase().includes(term.toLowerCase());
    });
    setFilteredProjects(filtered);
    setSelectedIndex(0);
    setShowUserCards(true);
  };

  const handleInputFocus = () => {
    setShowUserCards(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : 0;
        scrollToSelectedItem(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => {
        const newIndex =
          prevIndex < filteredProjects.length - 1 ? prevIndex + 1 : prevIndex;
        scrollToSelectedItem(newIndex);
        return newIndex;
      });
    } else if (event.key === "Enter") {
      if (selectedIndex !== -1) {
        handleUserSelect(filteredProjects[selectedIndex]);
      }
      inputRef.current?.blur();
    } else if (event.key === "Escape") {
      setShowUserCards(false);
    }
  };

  const handleUserSelect = (project: Project) => {
    navigate(`/home/project/${project.id}`);

    setSelectedIndex(0);
    setShowUserCards(false);
  };

  const scrollToSelectedItem = (index: number) => {
    if (listRef.current && listRef.current.children[index]) {
      listRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowUserCards(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (projects) {
      setFilteredProjects(projects);
    }
  }, [projects]);

  return (
    <div className={`w-full max-w-md ${className}`} ref={containerRef}>
      <div className="relative w-full lg:w-64">
        <Input
          className="rounded-lg pr-9"
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          ref={inputRef}
        />

        <div className="absolute top-2 right-3">
          <Search className="w-5 h-5" />
        </div>

        {showUserCards && (
          <Card className="absolute top-11 -left-24 lg:left-0 max-h-[20rem] overflow-y-auto w-[20rem]  lg:w-96 shadow-lg z-20 overflow-x-hidden bg-primary text-white">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>

            <CardContent className="h-full">
              {loading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Loader2 />
                </div>
              ) : filteredProjects.length > 0 ? (
                <ul className="space-y-2" ref={listRef}>
                  {filteredProjects.map((project, index) => (
                    <li
                      key={project.id}
                      className={clsx(
                        "flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-500",
                        index === selectedIndex ? "bg-gray-500" : ""
                      )}
                      onClick={() => handleUserSelect(project)}
                    >
                      <Briefcase className="w-5 min-w-5" />

                      <div>
                        <h4 className="text-sm font-medium lg:text-base">
                          {project.name}
                        </h4>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="flex items-center justify-center h-full text-white">
                  No projects found.
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectSearchInput;
