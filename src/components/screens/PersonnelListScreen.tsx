import React from 'react';
import { ChevronRight, Phone, MessageSquare, Building2 } from 'lucide-react';
import { EmployeePerson } from '../../types/card';
import { SteadyAvatar } from '../common/SteadyAvatar';

interface PersonnelListScreenProps {
  employees: EmployeePerson[];
  onSelectEmployee: (emp: EmployeePerson) => void;
}

export const PersonnelListScreen: React.FC<PersonnelListScreenProps> = ({
  employees,
  onSelectEmployee,
}) => {
  return (
    <div className="w-full pb-8 px-4 pt-3 space-y-3 animate-fade-in text-neutral-800">
      
      {/* List Header Count */}
      <div className="flex items-center justify-between px-1 text-xs text-neutral-400">
        <span>企业在职员工及商务顾问</span>
        <span>共 {employees.length} 位</span>
      </div>

      {/* Vertical Employee List Cards (Screen 05 in prototype) */}
      <div className="space-y-2.5">
        {employees.map((emp) => (
          <div
            key={emp.id}
            onClick={() => onSelectEmployee(emp)}
            className="group rounded-[22px] bg-white border border-black/[0.04] p-4 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.03)] hover:border-blue-200 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
          >
            {/* Left Avatar & Info */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {/* Steady Color Block Avatar (沉稳色块头像) */}
              <SteadyAvatar
                char={emp.avatarChar}
                bg={emp.avatarBg}
                size="lg"
                shape="circle"
                className="group-hover:scale-105 transition-transform"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-[#0052D9] transition-colors truncate">
                    {emp.name}
                  </h3>
                  {emp.isSaved && (
                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium">
                      已存通讯录
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-500 mt-0.5 truncate">
                  {emp.title} {emp.department ? `· ${emp.department}` : ''}
                </p>

                <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                  {emp.contacts.phone || emp.contacts.email}
                </p>
              </div>
            </div>

            {/* Right Action Chevron */}
            <div className="flex items-center gap-1 text-xs text-neutral-400 group-hover:text-[#0052D9] transition-colors shrink-0 ml-2">
              <span className="hidden sm:inline text-[11px]">查看名片</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
