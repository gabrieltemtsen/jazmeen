"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef, ForwardedRef } from "react";
import { useFormStatus } from "react-dom";
import CustomIcon from "../icons/custom-icons";
import { TriangleAlert } from "lucide-react";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  labelClassName?: string;
  iconClassName?: string;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  Icon?: React.ComponentType<any>;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg';
  onIconClick?: () => void;
  value?: any;
  error?: string | boolean;
  hasError?: boolean;
  min?: number;
  max?: number;
  checked?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      required,
      placeholder,
      disabled,
      className,
      defaultValue = "",
      value,
      onBlur,
      onChange,
      Icon,
      onIconClick,
      error,
      min,
      max,
      labelClassName,
      iconClassName,
      iconSize,
      checked
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1 mb-1 relative">
          {label && (
            <Label
              htmlFor={id}
              className={cn(
                "block text-sm font-normal text-gray font-dmSans",
                labelClassName
              )}
            >
              {label}
            </Label>
          )}
          <div className="relative">
            {type === 'textArea' ? (
              <Textarea
                onBlur={onBlur}
                onChange={onChange}
                value={value !== undefined ? value : defaultValue}
                ref={ref as ForwardedRef<HTMLTextAreaElement>}
                required={required}
                name={id}
                id={id}
                className={cn(
                  "text-sm px-2 py-1 h-10 pr-10 focus:ring-primary-foreground",
                  className,
                  error && "focus-visible:ring-red-500 focus:border-red-500"
                )}
                placeholder={placeholder}
              />
            ) : (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value !== undefined ? value : defaultValue}
                ref={ref as ForwardedRef<HTMLInputElement>}
                required={required}
                name={id}
                min={min}
                max={max}
                id={id}
                placeholder={placeholder}
                type={type}
                checked={checked}
                disabled={pending || disabled}
                className={cn(
                  "text-sm px-2 py-1 h-10 pr-10 focus:ring-primary-foreground",
                  className,
                  error && "focus-visible:ring-red-500 focus:border-red-500"
                )}
                aria-describedby={`${id}-error`}
              />
            )}
            {Icon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <CustomIcon
                  className={cn("text-gray-400", onIconClick && 'cursor-pointer', iconClassName)}
                  Icon={Icon}
                  isButton={!!onIconClick}
                  onClick={onIconClick}
                  size={iconSize}
                />
              </div>
            )}
          </div>
        </div>
        {error && (
          <div className="text-xs text-rose-500 ">
            <div className="flex items-center font-medium rounded-sm">
              <TriangleAlert className="h-4 w-4 mr-2" />
              {error}
            </div>
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
