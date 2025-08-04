import { formatDuration, formatRelativeDate } from "@/features/helpers";
import { CDN_URL } from "@/features/common/constants";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { Report } from "../types";

export const ReportsDetail = ({ data }: { data: Report }) => {
  return (
    <div className="h-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {data.filename}
            </h2>
            <p className="text-sm text-gray-600">
              Transcribed {formatRelativeDate(data.created_at)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={cn(
                "px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium",
                data.score > 7
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              )}
            >
              {Math.round((data.score / 10) * 100)}% Score
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Audio File
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <audio controls className="w-full" src={`${CDN_URL}/${data.path}`}>
              Your browser does not support playing audio.
            </audio>
          </div>
        </div>

        {data.tags && data.tags.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatDuration(data.duration)}
            </div>
            <div className="text-sm text-gray-600">Duration</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {data.transcript.length}
            </div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {data.transcript.split(" ").length}
            </div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
        </div>
      </div>

      {/* Analysis Sections */}
      <div className="space-y-6">
        {/* Strengths Section */}
        {data.strengths && data.strengths.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {data.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-green-800 leading-relaxed">
                      {strength}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Weaknesses Section */}
        {data.weaknesses && data.weaknesses.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Areas for Improvement
              </h3>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <ul className="space-y-2">
                {data.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-orange-800 leading-relaxed">
                      {weakness}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Suggestions Section */}
        {data.suggestions && data.suggestions.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <LightBulbIcon className="h-5 w-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Suggestions
              </h3>
            </div>
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <ul className="space-y-2">
                {data.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-primary-800 leading-relaxed">
                      {suggestion}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Transcription Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Transcription
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {data.transcript}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
