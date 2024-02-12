import { Link , LinkProps} from "expo-router";
import { Button } from "@/components/button";

type LinkButtonProps = LinkProps<string> & {
  title: string;
}

export function LinkButton({title, ...rest}: LinkButtonProps) {
  return (
    <Link
      className="text-slate-300 text-center text-base font-body"
      {...rest}
    >
      {title}
    </Link>
  )
}