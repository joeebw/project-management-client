import React, { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserAvatar from "@/components/UserAvatar";

interface User {
  id: number;
  userName: string;
}

interface MultiSelectUsersProps {
  users?: User[];
  selectedIds?: string[];
  onChange: (selectedIds: string[]) => void;
  error?: string;
}

const MultiSelectUsers = ({
  users = [],
  selectedIds = [],
  onChange,
  error,
}: MultiSelectUsersProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleUser = (userId: number) => {
    const stringId = userId.toString();
    if (selectedIds.includes(stringId)) {
      onChange(selectedIds.filter((id) => id !== stringId));
    } else {
      onChange([...selectedIds, stringId]);
    }
  };

  const removeUser = (userId: string) => {
    onChange(selectedIds.filter((id) => id !== userId));
  };

  const getSelectedUsers = () => {
    return users.filter((user) => selectedIds.includes(user.id.toString()));
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full border rounded-md cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            tabIndex={0}
          >
            <div className="flex flex-wrap w-full gap-1 p-2 min-h-10 bg-background">
              {getSelectedUsers().map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary"
                >
                  <UserAvatar
                    isLoading={false}
                    name={user.userName}
                    size="xs"
                    className="p-1"
                  />
                  <span className="text-sm">{user.userName}</span>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      removeUser(user.id.toString());
                    }}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        removeUser(user.id.toString());
                      }
                    }}
                    className="ml-1 rounded-full hover:bg-secondary-hover p-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </div>
                </div>
              ))}
              {selectedIds.length === 0 && (
                <div className="flex items-center h-8 text-muted-foreground">
                  Select users...
                </div>
              )}
              <div className="flex items-center self-center ml-auto">
                <ChevronsUpDown className="w-4 h-4 opacity-50" />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command className="w-full" shouldFilter={false}>
            <CommandList>
              <CommandInput
                placeholder="Search users..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="overflow-auto max-h-64">
                {filteredUsers.map((user) => {
                  const isSelected = selectedIds.includes(user.id.toString());
                  return (
                    <CommandItem
                      key={user.id}
                      value={user.userName}
                      onSelect={() => toggleUser(user.id)}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center flex-1 gap-2">
                        <UserAvatar
                          isLoading={false}
                          name={user.userName}
                          size="xs"
                          className="p-1"
                        />
                        {user.userName}
                      </div>
                      <Check
                        className={cn(
                          "h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default MultiSelectUsers;
