// File: MenuItem.tsx
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";

interface MenuItemProps {
  title: string;
  icon: string;
  href: string;
  description?: string;
  delay?: number;
  gradient?: string;
  color?: string;
  iconComponent?: LucideIcon;
}

export default function MenuItem({
  title,
  icon,
  href,
  description,
  delay = 0,
  gradient = "from-green-500/10 to-blue-500/10",
  color = "text-gray-800",
  iconComponent: IconComponent,
}: MenuItemProps) {
  return (
    <div
      className="group animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link to={href} className="block h-full">
        <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 overflow-hidden">
          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          ></div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col items-center text-center">
            {/* Icon Container */}
            <div className="mb-6 p-4 rounded-2xl bg-white/70 shadow-inner backdrop-blur-sm border border-white/50 group-hover:bg-white/90 transition-all duration-300">
              {IconComponent ? (
                <IconComponent
                  size={48}
                  className={`${color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                />
              ) : (
                <img
                  src={icon}
                  alt={title}
                  className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                  onError={(e) => {
                    // Fallback icon jika gambar tidak load
                    e.currentTarget.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className = `h-12 w-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center`;
                    fallback.innerHTML = `<span class="text-lg font-bold ${color}">${title.charAt(
                      0
                    )}</span>`;
                    e.currentTarget.parentNode?.appendChild(fallback);
                  }}
                />
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className={`text-xl font-bold ${color} mb-3 transition-colors duration-300`}
              >
                {title}
              </h3>

              {description && (
                <p className="text-gray-600 mb-4 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 text-sm">
                  {description}
                </p>
              )}

              {/* CTA Arrow */}
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-white/80 border border-white/50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <ArrowRight
                    size={16}
                    className={`${color} transition-transform duration-300 group-hover:translate-x-1`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </Link>
    </div>
  );
}
